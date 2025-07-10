import React from 'react';
import useAuthUser from '../hooks/useAuthUser';
import { useMutation } from '@tanstack/react-query';
import { completeOnboarding } from '../lib/api';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import {
  CameraIcon,
  ShuffleIcon,
  MapPinIcon,
  ShipWheelIcon,
  LoaderIcon,
} from 'lucide-react';
import { LANGUAGES } from '../constants/languages';
import { useNavigate } from 'react-router';

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  

  const [formState, setFormState] = React.useState({
    fullName: authUser?.fullName || '',
    bio: authUser?.bio || '',
    nativeLanguage: authUser?.nativeLanguage || '',
    learningLanguage: authUser?.learningLanguage || '',
    location: authUser?.location || '',
    profilePicture: authUser?.profilePicture || '',
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success('Profile onboarded successfully!');
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      console.log(authUser);
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    // to avoid refresh on submit
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    setFormState({ ...formState, profilePicture: randomAvatar });
    toast.success('Random profile picture selected!');
  };

  return (
    <div className='min-h-screen bg-base-100 flex items-center justify-center p-4'>
      <div className='card bg-base-200 w-full max-w-3xl shadow-xl'>
        <div className='card-body p-6 sm:p-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>
            Complete Your Profile
          </h1>

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Profile pic part */}
            <div className='flex flex-col items-center justify-center space-y-4'>
              {/* image preview */}
              <div className='size-32 rounded-full bg-base-300 overflow-hidden'>
                {formState.profilePicture ? (
                  <img
                    src={formState.profilePicture}
                    alt='Profile preview'
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='flex items-center justify-center h-full'>
                    <CameraIcon className='size-12 text-base-content opacity-40' />
                  </div>
                )}
              </div>

              <div className='flex items-center gap-2'>
                <button
                  className='btn btn-accent'
                  type='button'
                  onClick={handleRandomAvatar}
                >
                  <ShuffleIcon className='size-4 mr-2' />
                  Generate Random Avatar
                </button>
              </div>
            </div>
            {/* FullName */}
            <div className='form-control '>
              <label className='label'>
                <span className='label-text'>Full Name</span>
              </label>
              <input
                type='text'
                name='fullName'
                placeholder='Your full name'
                className='input input-bordered w-full'
                value={formState.fullName}
                onChange={(e) =>
                  setFormState({ ...formState, fullName: e.target.value })
                }
              />
            </div>
            {/* bio */}
            <div className='form-control '>
              <label className='label'>
                <span className='label-text'>Bio</span>
              </label>
              <input
                type='text'
                name='bio'
                placeholder='Tell others about yourself and your language learning goals'
                className='textarea textarea-bordered h-24'
                value={formState.bio}
                onChange={(e) =>
                  setFormState({ ...formState, bio: e.target.value })
                }
              />
            </div>
            {/* languages */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* Native languages */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Native Language</span>
                </label>
                <select
                  name='nativeLanguage'
                  value={formState.nativeLanguage}
                  className='select select-bordered w-full'
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      nativeLanguage: e.target.value,
                    })
                  }
                >
                  <option value=''>Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
              {/* Learning languages */}
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text'>Learning Language</span>
                </label>
                <select
                  name='learningLanguage'
                  value={formState.learningLanguage}
                  className='select select-bordered w-full'
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      learningLanguage: e.target.value,
                    })
                  }
                >
                  <option value=''>Select language you're learning</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* location */}
            <div className='form-control '>
              <label className='label'>
                <span className='label-text'>Location</span>
              </label>
              <div className='relative'>
                <MapPinIcon className='absolute top-1/2 transform left-3 size-5 -translate-y-1/2 text-base-content opacity-70' />

                <input
                  type='text'
                  name='location'
                  placeholder='City, Country'
                  className='input input-bordered w-full pl-10'
                  value={formState.location}
                  onChange={(e) =>
                    setFormState({ ...formState, location: e.target.value })
                  }
                />
              </div>
            </div>
            {/* submit button */}
            <button
              onClick={handleSubmit}
              disabled={isPending}
              type='submit'
              className='btn btn-primary w-full'
            >
              {!isPending ? (
                <>
                  <ShipWheelIcon className='size-5 mr-2' />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className='animate-spin size-5 mr-2' />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
