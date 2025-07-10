import React from 'react';
import { login } from '../lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ShipWheelIcon } from 'lucide-react';
import { Link } from 'react-router';

const LoginPage = () => {
  const [loginData, setLoginData] = React.useState({
    email: '',
    password: '',
  });

  const queryClient = useQueryClient();

  const {
    mutate: loginMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authUser'] }),
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
    // Handle login logic here, such as sending data to the server
  };

  return (
    <div
      className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8'
      data-theme='forest'
    >
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
        {/* LOGIN FORM SECTION */}
        <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
          {/* Logo */}
          <div className='mb-4 flex items-center justify-start gap-2'>
            <ShipWheelIcon className='size-9 text-primary' />
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
              TALKATY
            </span>
          </div>
          {/* Error */}
          {error && (
            <div className='alert alert-error mb-4'>
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className='w-full'>
            <form action='' onSubmit={handleLogin}>
              <div className='space-y-4'>
                <div>
                  <h2 className='text-xl font-semibold'>Welcome back!</h2>
                  <p className='text-sm opacity-70'>
                    Sign in to your account to continue your language journey.
                  </p>
                </div>
                <div className='flex flex-col gap-3'>
                  {/* EMAIL input */}
                  <div className='form-control w-full space-y-2'>
                    <label htmlFor='' className='label'>
                      <span className='label-text'>Email</span>
                    </label>
                    <input
                      type='email'
                      placeholder='meow@meow.com'
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      className='input 
                      input-bordered w-full
                      input-glow 
                      '
                      required
                    />
                  </div>
                  {/* Password input */}
                  <div className='form-control w-full space-y-2'>
                    <label htmlFor='' className='label'>
                      <span className='label-text'>Password</span>
                    </label>
                    <input
                      type='password'
                      placeholder='******'
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      className='input input-glow input-bordered w-full'
                      required
                    />
                  </div>
                  <button
                    type='submit'
                    disabled={isPending}
                    className='btn input-glow btn-primary w-full'
                  >
                    {isPending ? (
                      <>
                        <span className='loading  loading-spinner loading-xs'>
                          Signing in...
                        </span>
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </button>
                  <div className='text-center mt-4'>
                    <p className='text-sm'>
                      Don't have an account?{' '}
                      <Link
                        to='/signup'
                        className='text-primary hover:underline'
                      >
                        Create one
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Image section */}
        <div className='hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center'>
          <div className='max-w-md p-8'>
            {/* illustration */}
            <div className='relative aspect-square max-w-sm mx-auto'>
              <img
                src='mainPage.png'
                alt='Language Connection Illustration'
                className='w-full h-full hover:scale-105 transition-all duration-300 ease-in-out'
              />
            </div>
            <div className='text-center space-y-3 mt-6'>
              <h2 className='text-xl font-semibold'>
                Connect with language partners worldwide
              </h2>
              <p className='opacity-70'>
                Practice conversations, make friends and improve your language
                skills together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
