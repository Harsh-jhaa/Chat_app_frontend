import React from 'react';
import { ShipWheelIcon } from 'lucide-react'; // Ensure you have this icon installed
import { Link } from 'react-router';
import { useQueryClient, useMutation } from '@tanstack/react-query';
// import axiosInstance from '../lib/axios';
import { signup } from '../lib/api';

const SignupPage = () => {
  const [signupData, setSignupData] = React.useState({
    fullName: '',
    email: '',
    password: '',
  });

  const queryClient = useQueryClient();

  const {
    mutate: signupMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['authUser'] }),
  });

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
    // Handle signup logic here, such as sending data to the server
  };
  return (
    <div
      className='h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 '
      data-theme='forest'
    >
      <div className='border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden'>
        {/* Signup left-side part */}
        <div className='w-full lg:w-1/2 p-4 sm:p-8 flex flex-col'>
          {/* logo */}
          <div className='mb-4 flex items-center justify-start gap-2'>
            <ShipWheelIcon className='size-9 text-primary' />
            <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
              TALKATY
            </span>
          </div>

          {error && (
            <div className='alert alert-error mb-4'>
              {error.response.data.message}
            </div>
          )}

          <div className='w-full'>
            <form action='' onSubmit={handleSignup}>
              <div className='space-y-4'>
                <div>
                  <h2 className='text-xl font-semibold'>Creat an Account</h2>
                  <p className='text-sm opacity-70'>
                    Join TALKATY and start learning languages with real-time
                    interaction!
                  </p>
                </div>
                <div className='space-y-3'>
                  {/* Full Name */}
                  <div className='form-control w-full'>
                    <label htmlFor='' className='label'>
                      <span className='label-text'>Full Name</span>
                    </label>
                    <input
                      type='text'
                      placeholder='Meow Mosi'
                      className='input input-bordered w-full input-glow placeholder:text-sm placeholder:opacity-70'
                      value={signupData.fullName}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          fullName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  {/* Email */}
                  <div className='form-control w-full'>
                    <label htmlFor='' className='label'>
                      <span className='label-text'>Email</span>
                    </label>
                    <input
                      type='email'
                      placeholder='meow@gmail.com'
                      className='input input-bordered w-full 
                     input-glow placeholder:text-sm placeholder:opacity-70'
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  {/* Password */}
                  <div className='form-control w-full'>
                    <label htmlFor='' className='label'>
                      <span className='label-text'>Password</span>
                    </label>
                    <input
                      type='password'
                      placeholder='********'
                      className='input input-bordered w-full 
                      input-glow placeholder:text-sm placeholder:opacity-70'
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                    <p className='text-xs opacity-70'>
                      Password must be atleast 6 characters long
                    </p>
                  </div>
                  <div className='form-control'>
                    <label
                      htmlFor=''
                      className='label cursor-pointer justify-start gap-2'
                    >
                      <input
                        type='checkbox'
                        className='checkbox checkbox-sm'
                        required
                      />
                      <span className='text-xs leading-tight'>
                        I agree to the{' '}
                        <span className='text-primary hover:underline'>
                          terms and services
                        </span>{' '}
                        and{' '}
                        <span className='text-primary hover:underline'>
                          privacy policy
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
                <button
                  className='btn btn-primary w-full input-glow  '
                  type='submit'
                >
                  {isPending ? (
                    <>
                      <span className='loading loading-spinner loading-xs'></span>
                      Loading...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>

                <div className='text-center mt-4'>
                  <p className='text-sm'>
                    Already have an account?{' '}
                    <Link to='/login' className='text-primary hover:underline'>
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Signup right-side part */}
        <div
          className='hidden lg:flex w-full lg:w-1/2 bg-primary/10
      items-center justify-center'
        >
          <div className='max-w-md p-8'>
            {/* illustration */}
            <div className='relative aspect-square max-w-sm mx-auto'>
              <img
                src='/mainPage.png'
                alt='Language Learning Illustration'
                className='w-full h-full hover:scale-105 transition-transform duration-300 ease-in-out'
              />
            </div>
            <div className='text-center space-y-3 mt-6'>
              <h2 className='text-xl font-semibold'>
                Connect with different people worldwide
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

export default SignupPage;
