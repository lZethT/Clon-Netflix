import React, { createContext, useContext, useEffect, useState } from "react";

const IndexedDBContext = createContext(null);

export const useIndexedDB = () => useContext(IndexedDBContext);

export const IndexedDBProvider = ({ children }) => {
  const [db, setDB] = useState(null);

  useEffect(() => {
    const idb =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB ||
      window.shimIndexedDB;

    const IDBOpenDBRequest = idb.open("netflix-db", 1);

    IDBOpenDBRequest.onsuccess = () => {
      setDB(IDBOpenDBRequest.result);
    };

    IDBOpenDBRequest.onerror = () => {
      console.log("Hubo un error con IndexedDB");
    };
    IDBOpenDBRequest.onupgradeneeded = () => {
      const database = IDBOpenDBRequest.result;
      if (!database.objectStoreNames.contains("users")) {
        const store = database.createObjectStore("users", {
          autoIncrement: true,
        });
        store.createIndex("email", "email", { unique: true });
      }
    };
  }, []);

  const addToIndexedDB = (data) => {
    if (!db) {
      console.error("La base de datos indexedDB no está disponible");
      return;
    }

    const transaction = db.transaction(["users"], "readwrite");
    const store = transaction.objectStore("users");

    const request = store.add(data);

    request.onerror = (e) => {
      console.log("Error al agregar el dato", e.target.error);
    };

    request.onsuccess = (e) => {
      console.log("Dato agregado correctamente");
    };
  };

  const updateInIndexedDB = (email, newPassword) => {
    return new Promise((resolve, reject) => {
      if (!db) {
        console.error("La base de datos indexedDB no está disponible");
        return;
      }

      const transaction = db.transaction(["users"], "readwrite");
      const store = transaction.objectStore("users");
      const index = store.index("email");

      const request = index.getKey(email);

      request.onerror = (e) => {
        console.log(
          "Error al obtener el registro para actualizar",
          e.target.error
        );
        reject("Error al verificar en la IndexedDB");
      };

      request.onsuccess = (e) => {
        const key = e.target.result;
        if (key) {
          const getRequestByKey = store.get(key);

          getRequestByKey.onsuccess = (e) => {
            const userData = e.target.result;
            userData.password = newPassword;
            const updateRequest = store.put(userData, key);

            updateRequest.onerror = (e) => {
              console.log("Error al actualizar el registro", e.target.error);
              reject("Error al actualizar contraseña");
            };

            updateRequest.onsuccess = (e) => {
              resolve(true);
            };
          };

          getRequestByKey.onerror = () => {
            reject("Error al buscar la información del usuario ");
          };
        } else {
          reject("no se encontro la key");
        }
      };
    });
  };

  const checkEmailExists = (email, password, action) => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject("La base de datos IndexedDB no está disponible");
        return;
      }

      const transaction = db.transaction(["users"], "readonly");
      const store = transaction.objectStore("users");
      const index = store.index("email");

      const request = index.get(email);

      request.onerror = (e) => {
        console.log("Error al verificar el correo:", e.target.error);
        reject("Error al verificar el correo");
      };

      request.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          if (action === "login") {
            password === cursor.password
              ? resolve({ found: true, passwordCorrect: true })
              : resolve({ found: true, passwordCorrect: false });
          } else {
            resolve({ found: true });
          }
        } else {
          resolve({ found: false });
        }
      };
    });
  };

  return (
    <IndexedDBContext.Provider
      value={{ db, addToIndexedDB, checkEmailExists, updateInIndexedDB }}
    >
      {children}
    </IndexedDBContext.Provider>
  );
};
