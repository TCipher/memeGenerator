import React from "react"


export default function Meme(){
   
    const [meme,setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })
    const [allMemes, setAllMemes] = React.useState([])
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])
    
    console.log(allMemes)
     
      function getMemeImage() {
        const memesArray = allMemes
        const randomNumber = Math.floor(Math.random() * memesArray.length)
        const url = memesArray[randomNumber].url
        setMeme(prevMeme =>
            ({
                ...prevMeme,
               randomImage: url

            }))
        
    }
    function handleChange(event){
        const {type, name, value} = event.target
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name]: value

            }
        })
    }
    console.log(meme)
    
    return (
        <main>
            <div className="form">
                    <input
                    type="text"
                    className="form--input"
                    placeholder="top-text"
                    name = "topText"
                    value = {meme.topText}
                    onChange ={handleChange}
                    />
                    <input 
                    type="text" 
                     className="form--input"
                     placeholder="bottom--text"
                     name = "bottomText"
                     value = {meme.bottomText}
                     onChange ={handleChange}
                    />
                    <button className="form--button" onClick ={getMemeImage}>Get a new meme image  🖼</button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
            
        </main>
    )
}