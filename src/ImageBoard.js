import React from "react";

class ImageBoard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentImage: 0,
            imageSet: []
        }
    }
    
    addCurrentImage = () =>{
        let currentImage = this.state.currentImage + 1;

        if (currentImage === this.props.count){
            currentImage = 0;
        }
        this.setState({
            currentImage
        })
    }
    componentDidMount () {      
        let request = [];
        for (let i = 0; i < this.props.count; i++) {
            let req = fetch(`https://source.unsplash.com/random/${ i }`);
            request.push(req);
        }

        Promise.all(request)
            .then((response) => {
                console.log('This is your data', response[0].url);
                let imageSet = [];
                for(let i = 0; i < this.props.count; i++) {
                    imageSet.push(response[i].url)
                }
                this.setState(
                    {imageSet}, 
                    () =>  {
                    this.myInterval = setInterval(this.addCurrentImage, this.props.interval); 
                });
               
            })      
    }
    handlePrev = () =>{
        clearInterval(this.myInterval)
        let currentImage = this.state.currentImage - 1;
        if (currentImage < 0){
            currentImage = 0
        }
        this.setState({currentImage}, () => {
            this.myInterval = setInterval(this.addCurrentImage, this.props.interval); 
        });
    }
    handleNext = () =>{
        clearInterval(this.myInterval)
        let currentImage = this.state.currentImage + 1;
        if (currentImage > this.props.count - 1){
            currentImage = this.props.count - 1
        }
        this.setState({currentImage}, () =>{
            this.myInterval = setInterval(this.addCurrentImage, this.props.interval);
        })
    }
    handleButton = (i) =>{
        clearInterval(this.myInterval);
        let currentImage = i;
        this.setState({currentImage}, () =>{
            this.myInterval = setInterval(this.addCurrentImage, this.props.interval);
        });
    }
    render(){
        const images = this.state.imageSet;
        const array = []
        for (let i = 0; i < this.props.count; i++){
            array.push(i);
        }
        return(
            
            <div>
                <div style={{height:"550px"}}>
                    <img src={images[this.state.currentImage]} style={{display: "block", width:"300px", margin: "auto", marginTop: "20px"}}/>
                </div>
                <div style={{display: "flex", justifyContent:"center"}}>
                <button onClick = {this.handlePrev}>prev</button> 
                {
                    array.map((i) => {
                        return <button onClick = {() => this.handleButton(i) } key = {i}>{i+1}</button>
                    })
                }
                <button onClick = {this.handleNext}>next</button>
                </div>
            </div>
        
        )
    }
}

export default ImageBoard;
