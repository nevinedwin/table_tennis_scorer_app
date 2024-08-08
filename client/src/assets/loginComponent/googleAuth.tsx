import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { getConfig } from '../../utilities/config';

const config = getConfig();


const GoogleLoginButton: React.FC = () => {


    const handleGoogleLogin = async (
        response: GoogleLoginResponse | GoogleLoginResponseOffline
    ) => {
        if ('accessToken' in response) {
            try {
                const res = await fetch('/api/google/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ accessToken: response.accessToken }),
                });
                if (res.ok) {
                    // Handle successful login (e.g., store the token, redirect to a protected route)
                    console.log('Logged in successfully!');
                } else {
                    // Handle login error
                    console.error('Error logging in:', res.status);
                }
            } catch (error) {
                console.error('Error logging in:', error);
            }
        } else if (window.opener) {
            // Handle the case where the sign-in window is closed
            console.log('Google sign-in window closed');
        }
    };

    return (
        <GoogleLogin
            clientId={config.CLIENT_ID}
            onSuccess={handleGoogleLogin}
            onFailure={(error) => console.error('Google login error:', error)}
            cookiePolicy="single_host_origin"
            render={(renderProps) => (
                <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="flex justify-center items-center bg-primary hover:bg-primary-light text-light font-medium rounded-lg py-2 px-4 w-full animate-bounce"
                >
                    <FontAwesomeIcon icon={faGoogle} className="mr-2 text-2xl" />
                    Sign in with Google
                </button>
            )}
        />
    );
};

export default GoogleLoginButton;