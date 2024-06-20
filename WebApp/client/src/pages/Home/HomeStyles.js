export const styles = {
    container: {
      display: "flex",
      height: '100vh',
    },
    sidebar: {
      height: "100vh",
    },
    searchContainer: {
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      border: '1px solid transparent',
      width: '80%', // Use percentage for width
      maxWidth: '300px', // Set a maximum width
      height: '35px',
      padding: '0 12px',
      borderRadius: '17px',
      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
      backgroundColor: '#fff',
      position: 'absolute',
      right: '15%', // Adjusted for smaller screens
      top: '2%',
    },
    searchIcon: {
      marginRight: '8px',
      fontSize: '20px',
      color: '#757575',
    },
    searchBox: {
      width: '80%', // Use percentage for width
      border: 'none',
      outline: 'none',
      fontSize: '14px',
    },
    avatar: {
      backgroundColor: '#87d068',
      position: 'absolute',
      right: '0.5%',
      top: '2.5%',
    },

    '@media (max-width: 1024px)': {
      sidebar: {
        width: '300px',
      },
      searchContainer: {
        width: '85%',
        right: '10%',
      },
    },
    '@media (max-width: 768px)': {
      sidebar: {
        width: '200px',
      },
      searchContainer: {
        width: '90%',
        right: '5%',
        top: '4%',
      },
    },
    '@media (max-width: 480px)': {
      sidebar: {
        width: '180px',
      },
      searchContainer: {
        width: '100%',
        maxWidth: 'none',
        right: '2%',
        top: '4%',
        padding: '0 8px',
      },
    },
    '@media (max-width: 320px)': {
      sidebar: {
        width: '150px',
      },
      searchContainer: {
        width: '100%',
        maxWidth: 'none',
        right: '2%',
        top: '4%',
        padding: '0 5px',
      },
    },
  };
  
  export const containerStyle = {
    width: '100%',
    height: '100vh',
  };
  
  export const center = {
    lat: 6.2667,
    lng: 80.0333,
  };
  