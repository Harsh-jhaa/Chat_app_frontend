import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import useAuthUser from '../hooks/useAuthUser';
import { useQuery } from '@tanstack/react-query';
import { getStreamToken } from '../lib/api';

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';
// import { set } from 'mongoose';
import PageLoader from '../components/PageLoader';
import { toast } from 'react-hot-toast';

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;
const CallPage = () => {
  const { id: callId } = useParams();
  const [client, setClient] = React.useState(null);
  const [call, setCall] = React.useState(null);
  const [iaConnecting, setConnecting] = React.useState(true);

  const { authUser, isLoading } = useAuthUser();
  const { data: tokenData } = useQuery({
    queryKey: ['streamToken'],
    queryFn: getStreamToken,
    enabled: !!authUser, //this will run only when authUser is available
  });

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData?.token || !authUser || !callId) return;

      try {
        console.log('Initializing stream video call client...');

        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePicture,
        };
        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });

        const callInstance = videoClient.call('default', callId);
        await callInstance.join({ create: true });
        console.log('Call joined successfully!');

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error('Error initializing call', error);
        toast.error('Could not join the call. Please try again.');
      } finally {
        setConnecting(false);
      }
    };
    initCall();
  }, [tokenData, authUser, callId]);

  if (isLoading || iaConnecting) return <PageLoader />;

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <div className='relative'>
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className='flex items-center justify-center h-full'>
            <p>Could not initialize call. Please refresh or try again later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();
  if (callingState === CallingState.LEFT) return navigate('/');

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default CallPage;
