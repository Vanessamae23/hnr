import { db } from "./firebase";
import { ref, set, get, push, update, remove } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { Class } from "../types/types";

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve) => {
      const auth = getAuth();
  
      // Listen for changes in the authentication state
      onAuthStateChanged(auth, (user) => {
        resolve(user || null);
      });
    });
  };

  export const logout = (onLogoutSuccess?: () => void): Promise<boolean> => {
    return new Promise((res, rej) => {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          alert('Successfully logged out');
          // Invoke the callback if provided
          if (onLogoutSuccess) {
            onLogoutSuccess();
          }
          res(true);
        })
        .catch((err) => {
          console.error(err.message);
          rej(err);
        });
    });
  };

export const register = (email: string, password: string): Promise<User | any> => {
  return new Promise((res, rej) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).then(
      async (userData) => {
        const user = userData.user;
        const reference = ref(db, `users/${user.uid}`);
        // Assuming you want to create a new child with a unique key
        const newUserRef = push(reference);

        // Set the user data under the newly created child
        await set(newUserRef, {
          uid: user.uid,
          classes: [],
          // Add other user data as needed
        });
        alert("Successfully register")
      }
    );
  });
};

export const writeClass = (myClass: Class[]) => {
  return new Promise((res, rej) => {
    const auth = getAuth();

    // Listen for changes in the authentication state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const userRef = ref(db, `users/${user.uid}`);

        set(userRef, {
          classes: myClass,
        });

        res("Successfully saved");
      } else {
        rej("Something wrong");
      }
    });
  });
};

export const getClasses = (): Promise<Class[] | null> => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();

    // Listen for changes in the authentication state
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = ref(db, `users/${user.uid}`);
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            const userData = snapshot.val();
            const classes = userData.classes || [];
            resolve(classes);
          } else {
            resolve(null);
          }
        } catch (error) {
          reject(error);
        }
      } else {
        // User is signed out
        resolve(null);
      }
    });
  });
};

export const login = (email: string, password: string): Promise<User | any> => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userData: any) => {
        const user = userData.user;
        const reference = ref(db, `users/${user.uid}/`);
        get(reference)
          .then((data) => {
            if (data.exists()) {
              resolve("Successfully Logged In");
            }
          })
          .catch((error) => {
            reject(error.message);
          });
      })
      .then((res: any) => {
        alert("Successfully register")
        resolve("Successfully Logged In");
      })
      .catch((error: any) => {
        reject(error.message);
      });
  });
};
