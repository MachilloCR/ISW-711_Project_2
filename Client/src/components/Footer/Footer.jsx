import React from "react";
import "./footer.css"

function Footer() {

    return (
        <>
            <footer className="page-footer font-small blue pt-4">
                <div className="container-fluid text-center text-md-left">
                    <div className="">
                        <div className="">
                            <h5 className="text-uppercase">Footer Content</h5>
                            <p>Here you can use rows and columns to organize your footer content.</p>
                        </div>
                    </div>
                </div>

                <div className="footer-copyright text-center py-3">© 2020 Copyright:
                    <a href="https://mdbootstrap.com/"> MDBootstrap.com</a>
                </div>

            </footer>
        </>
    );
}

export default Footer;