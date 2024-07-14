import { useState, useEffect } from 'react';

const useGoogleMapsScript = (apiKey) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;
      
      const initMap = () => {
        setIsLoaded(true);
      };

      window.initMap = initMap;
      document.head.appendChild(script);
    } else {
      setIsLoaded(true);
    }
  }, [apiKey]);

  return isLoaded;
};

export default useGoogleMapsScript;