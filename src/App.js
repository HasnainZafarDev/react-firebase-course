import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/auth";
import { auth, db,storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, SetMovieList] = useState([]);
  // for new movie
  const [newMovieTitle, SetNewMovieTitle] = useState("");
  const [newReleaseDate, SetNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  // update title state
  const [updatedTitle, setUpdatedTitle] = useState("");

  // File Upload state
  const [fileUpload,setFileUpload] = useState(null)

  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      SetMovieList(filteredData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMovieList();
  }, []);

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
    getMovieList();
  };

  const uploadFile = async () => {
    if(!fileUpload)return;
    const filesFolderRef = ref(storage,`projectfolder/${fileUpload.name}`)
    await uploadBytes(filesFolderRef,fileUpload)
  };
  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        recievedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="App">
      <Auth />
      <input
        placeholder="Movie Title...."
        onChange={(e) => SetNewMovieTitle(e.target.value)}
      />
      <input
        placeholder="Release Date"
        type="number"
        onChange={(e) => SetNewReleaseDate(Number(e.target.value))}
      />
      <input
        type="checkbox"
        checked={isNewMovieOscar}
        onChange={(e) => setIsNewMovieOscar(e.target.checked)}
      />
      <label>Receive An Oscar</label>
      <button onClick={onSubmitMovie}>Submit Movie</button>
      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{ color: movie.recievedAnOscar ? "green" : "red" }}>
              {movie.title}
            </h1>
            <p>Date : {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input
              placeholder="new title..."
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(movie.id)}>
              Update Title
            </button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={(e)=> setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
