import React from "react"
import { render } from "react-dom"
import { Router, Link } from "@reach/router"
import Feed from "./feeds"
import Profile from "./profile"
import { Card } from "@mui/material"

let Dash = (params: any) => <div>Dash</div>


let AppRouter = () => (
    <Router>

        <Feed path="/" default />
        <Profile path="profile" />
    </Router>
)

export default AppRouter