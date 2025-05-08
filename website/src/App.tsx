import cat from '/cat.jpg'
import './App.css'

function App() {
  return (
    <>
      <h1>Example Website</h1>
      <div className="polaroid">
        <img src={cat} className="cat" alt="Cat picture" />
        <div className="container">
          <p>This is Poppy!</p>
        </div>
      </div>
    </>
  )
}

export default App
