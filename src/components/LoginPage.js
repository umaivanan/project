import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './LoginPage.css';

const LoginPage = () => {
    const initialStateErrors = {
        email: { required: false },
        password: { required: false },
        custom_error: null,
    };

    const [errors, setErrors] = useState(initialStateErrors);
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate(); // Initialize useNavigate

    const handleInput = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let errors = { ...initialStateErrors };
        let hasError = false;

        // Validate inputs
        if (inputs.email === "") {
            errors.email.required = true;
            hasError = true;
        }
        if (inputs.password === "") {
            errors.password.required = true;
            hasError = true;
        }

        if (hasError) {
            setErrors(errors);
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:8600/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputs),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("User logged in successfully:", data);
                // Navigate to the next page on success
                navigate('/add-skill'); // Redirect to the desired page
            } else {
                setErrors({ ...errors, custom_error: data.message || 'Something went wrong' });
            }
        } catch (error) {
            console.error("Error occurred:", error);
            setErrors({ ...errors, custom_error: 'An unexpected error occurred' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="login-block">
            <div className="container">
                <div className="row">
                    <div className="col login-sec">
                        <h2 className="text-center">Login</h2>
                        <form className="login-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email" className="text-uppercase">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    onChange={handleInput}
                                    name="email"
                                    id="email"
                                    value={inputs.email}
                                />
                                {errors.email.required && <span className="text-danger">Email is required.</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="text-uppercase">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    onChange={handleInput}
                                    name="password"
                                    id="password"
                                    value={inputs.password}
                                />
                                {errors.password.required && <span className="text-danger">Password is required.</span>}
                            </div>
                            <div className="form-group">
                                {errors.custom_error && <span className="text-danger"><p>{errors.custom_error}</p></span>}
                                {loading && <div className="text-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>}
                                <input
                                    type="submit"
                                    className="btn btn-login float-right"
                                    disabled={loading}
                                    value="Login"
                                />
                            </div>
                            <div className="clearfix"></div>
                            <div className="form-group">
                                Don't have an account? Please <a href="/register">Register</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
