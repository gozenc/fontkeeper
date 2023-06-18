import { Link } from "react-router-dom";
import React from "react";

export default function PageNotFound() {
    return (
        <div>
            <h2>It looks like you're lost...</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    );
}