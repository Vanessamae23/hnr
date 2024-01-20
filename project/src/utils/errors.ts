export const checkLinkValidity = (link) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(link, { method: 'HEAD' });
  
        if (response.ok) {
          resolve(true);
        } else {
          reject(new Error("Link Not Valid"));
        }
      } catch (error) {
        reject(new Error("Link Not Valid"));
      }
    });
  };