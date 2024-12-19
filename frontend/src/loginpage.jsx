import React, { useState } from 'react';
import {
    Container,
    TextField,
    Button,
} from '@mui/material';

let message = false;

function LoginPage ({ setIsLoggedIn }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const login = async (element) => {
        element.preventDefault();
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (data.success) {
            alert("登入成功!!")
            setIsLoggedIn(true);
            message = true;
            console.log(message);
        } else {
            message = false;
            console.log(message); 
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          login(event); // 執行登入邏輯
        }
    };

    return (
        <Container className="p-3 my-5 d-flex flex-column w-50">

        <div>
            <h1 style = {{textAlign: 'center', fontSize:'350%'}}><b>永暘電腦資訊股份有限公司</b></h1>
        </div>

        <TextField
        className="mb-4"
        label="Email address"
        variant="outlined"
        fullWidth
        margin="normal"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={(event) => handleKeyDown(event)}
        />
        <TextField
        className="mb-4"
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        onChange={(p) => setPassword(p.target.value)}
        onKeyDown={handleKeyDown} 
        />
        <Button
            // className="mb-4"
            variant="contained"
            color="primary"
            fullWidth
            onClick={login}
        >
            Sign in
        </Button>

        </Container>
    );
}

export default LoginPage;

