import "../styles/MyQuotes.css";
import axios from "axios";
import * as React from 'react';
import { Component } from "react";
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Input from '@mui/material/Input';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AddIcon from '@mui/icons-material/Add';

//import IconButton from "@material-ui/core/IconButton";


const client = axios.create({
    baseURL: "."
});

class MyQuotes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            text: "",
            Users: []
        };

    }


    handleChange = (e) => {
        this.setState({
            text: `${e.target.value}`
        });

        this.getPosts();
    }

    deleteQuote(id) {
        //client.post('http://localhost:3001/api/delQuote', {})
    }

    modifyQuote(id) {
        //client.post('http://localhost:3001/api/modifyQuote', {})
    }

    componentDidMount() {
        client.post('http://localhost:3001/api/createTables', {})

        //Remplis la abse avec deux citations par defaut
        var texte = {
            texte: "React c'est génial !"
        };

        client
            .post(`http://localhost:3001/api/testCreate/`, { texte })
            .then(response => {
                console.log(response);
            })

        texte = {
            texte: "Node c'est génial !"
        };


        client
            .post(`http://localhost:3001/api/testCreate/`, { texte })
            .then(response => {
                console.log(response);
                // Handle response
            })

        //récupère et affiche les posts
        this.getPosts();

    }

    //récupère et affiche les posts
    getPosts = () => {
        client.get('http://localhost:3001/api/get')
            .then((response) => {
                const result = response.data;
                const users = result.map(u =>

                    <div className="enregistrementContainer" key={'div' + u.id}>
                        <div className="enregistrement">
                            <p key={u.id}>{u.quote}</p>
                            <div className="iconDiv">

                                {/*<IconButton onClick={this.deleteQuote(u.id)}>*/}{/*Non fonctionnel -> erreur invalid hook calls même sans le onClick*/}
                                <DeleteIcon onClick={this.deleteQuote(u.id)} />
                                {/*</IconButton>*/}

                                {/*<IconButton onClick={this.modifyQuote(u.id)}>*/}{/*Non fonctionnel -> erreur invalid hook calls même sans le onClick*/}
                                <ModeEditIcon onClick={this.modifyQuote(u.id)} />
                                {/*</IconButton>*/}
                            </div>
                        </div>
                        <Divider style={{ width: '100%', borderBottomWidth: 2 }} />
                    </div >
                )
                this.setState({ users })
            });
    }

    handleSubmit = (e) => {
        const texte = {
            texte: this.state.text
        };

        client.post(`http://localhost:3001/api/testCreate/`, { texte })
        this.getPosts();
    }

    render() {
        return (
            <div className="containerMQ">
                <h2 className="myQuotes">Mes citations</h2>
                <div className="addQuote">
                    <Button
                        onClick={this.handleSubmit}
                        variant="text"
                        size="large"
                        style={{
                            color: "white",
                            backgroundColor: "#6203AD",
                            borderRadius: 10,
                            textTransform: 'none',
                            fontSize: '0.8rem',
                            fontWeight: "bold"
                        }}

                        startIcon={<AddIcon />}
                    >Ajouter une citation </Button>

                    <Input
                        onChange={this.handleChange}
                        className="inputAddQuote"
                        style={{
                            border: "2px solid #6203AD",
                            color: "#6203AD",
                            backgroundColor: "transparent",
                            borderRadius: 10,
                            textTransform: 'none',
                            fontSize: '0.8rem',
                            fontWeight: "bold",
                            padding: "5px",
                            paddingInline: "10px",
                            width: "425px"
                        }}
                        disableUnderline={true}
                        placeholder="Ajouter une citation"
                    />
                </div>
                <div className="stateUserContainer">
                    <Divider style={{ width: '100%', borderBottomWidth: 2 }} />
                    {this.state.users}
                </div>
            </div>
        );
    }
}

export default MyQuotes;