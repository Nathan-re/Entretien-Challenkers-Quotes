import "../styles/Quotes.css";
import axios from "axios";
import * as React from 'react';
import { Component } from "react";
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StarBorderIcon from '@mui/icons-material/StarBorder';


const client = axios.create({
    baseURL: "."
});

const baseUrlApi = "https://kaamelott.chaudie.re/api";

class Quotes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: "",
            Users: [],
            OneQuote: [],
            OneQuoteApi: []
        };


    }


    handleChange = (e) => {
        console.log(e.target.value);

        this.setState({
            text: `${e.target.value}`
        });
    }

    deleteQuote(id) {
        console.log("test33");
    }

    modifyQuote(id) {
        console.log("test34");
    }

    componentDidMount() {


    }

    showOneMyQuote() {
        console.log("içi")
        client.get('http://localhost:3001/api/getOneRandom')
            .then((response) => {
                console.log(response);
                const result = response.data;

                const OneQuote = result.map(u =>
                    <p>{u.quote}</p>
                )
                console.log(OneQuote);

                this.setState({ OneQuote })

            })
    }

    showApiQuote() {
        console.log("içi api kaa")
        client.get('http://localhost:3001/api/getApiKaa')
            .then((response) => {
                console.log(response);
                const result = response.data;

                const OneQuote = result.map(u =>
                    <p>{u.quote}</p>
                )
                console.log(OneQuote);

                this.setState({ OneQuote })

            })
        
    }



    componentWillUnmount() {

    }

    handleSubmit = (e) => {
        console.log("it works 2");
        // Prevent the default submit and page reload
        e.preventDefault();

        const texte = {
            texte: this.state.text
        };


        client
            .post(`http://localhost:3001/api/testCreate/`, { texte })
            .then(response => {
                console.log(response);
                // Handle response
            })

    }

    render() {
        return (
            <div className="containerQuotes">
                <div className="randomQuotes">
                    <h1 className="quotes">Citations</h1>
                    <div className="divQuote">
                        {this.state.OneQuote}
                        <p className="quote">Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
                        <p className="author">Charlemagne - "Lorem ipsum"</p>
                        <div className="favoriteContainer">
                        <StarBorderIcon></StarBorderIcon>
                        <p className="favorite">Mettre en favoris</p>
                        </div>
                        
                    </div>
                </div>
                <div className="selectQuotes">
                    <h2 className="showQuote">Afficher une autre citation</h2>
                    <div className="buttonsQuotes">
                        <Button
                            onClick={this.showOneMyQuote}
                            variant="text"
                            size="large"
                            style={{
                                color: "#6203AD",
                                backgroundColor: "white",
                                borderRadius: 10,
                                textTransform: 'none',
                                fontSize: '0.8rem',
                                fontWeight: "bold"
                            }}

                            startIcon={<VisibilityIcon />}
                        >Parmi mes citations</Button>

                        <Button
                            onClick={this.showApiQuote}
                            variant="text"
                            size="large"
                            style={{
                                color: "#6203AD",
                                backgroundColor: "white",
                                borderRadius: 10,
                                textTransform: 'none',
                                fontSize: '0.8rem',
                                fontWeight: "bold"
                            }}

                            startIcon={<VisibilityIcon />}
                        >
                            Parmi les citations de Kaamelott
                        </Button>
                    </div>
                    
                </div>
                
            </div>
        );
    }


}

export default Quotes;