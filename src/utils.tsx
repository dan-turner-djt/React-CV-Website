import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, setDoc, deleteDoc, doc } from 'firebase/firestore';

export const checkLoggedIn = () => {
  const auth = getAuth();
  if (auth.currentUser) {
    console.log("loggedin");
    return true;
  }
  return false;
}

export const Links = {
  Home: '/',
  Skills: '/skills',
  WorkHistory: '/work-history',
  Education: '/education',
  Projects: '/projects',
  Japanese: '/japanese',
  DemoPage: '/demo-page',
  Login: '/login'
}

export const updateOrdering = (list) => {
  let orderedList = [...list];
  orderedList.sort((a,b) => Number(a.doc.order) - Number(b.doc.order));
  orderedList.forEach((item, i) => {
    if (!item.deleted && item.doc.order !== i) {
      orderedList[i].doc.order = i;
    }
  });

  return orderedList;
}

export const getFirebaseDocs = (resourceName) => {
  const db = getFirestore();
  const colRef = collection(db, resourceName);

  return new Promise((resolve, reject) => {
    getDocs(colRef)
    .then((snapshot) => {
      let foundDocs = [];
      snapshot.docs.forEach((document) => {
        foundDocs.push({ ...document.data(), id: document.id });
      })
      foundDocs = foundDocs.map((docInfo) => {
        return {doc: docInfo, edited: false, deleted: false};
      })
      foundDocs = updateOrdering(foundDocs);
      resolve(foundDocs);
    })
    .catch(err => {
      reject(err);
    });
  });
}

export const setFirebaseDocs = (resourceName, infoToSet, counter = 0) => {
  const db = getFirestore();

  return new Promise<void>((resolve, reject) => {
    if (infoToSet.length === 0) {
      resolve();
      return;
    }
    const data = infoToSet[counter];
    const id = data.id;
    setDoc(doc(db, resourceName, String(id)), data)
    .then(() => {
      counter++;
      if (counter > 100) {
        reject("Too many attempted sets");
        return;
      }
      if (counter < infoToSet.length) {
        setFirebaseDocs(resourceName, infoToSet, counter)
        .then (() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
      } else {
        resolve();
      }
    })
    .catch((err) => {
      reject(err);
    });
  });
}

export const deleteFirebaseDocs = (resourceName, infoToSet, counter = 0) => {
  const db = getFirestore();

  return new Promise<void>((resolve, reject) => {
    if (infoToSet.length === 0) {
      resolve();
      return;
    }
    const id = infoToSet[counter].id;
    deleteDoc(doc(db, resourceName, String(id)))
    .then(() => {
      counter++;
      if (counter > 100) {
        reject("Too many attempted deletes");
        return;
      }
      if (counter < infoToSet.length) {
        deleteFirebaseDocs(resourceName, infoToSet, counter)
        .then (() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
      } else {
        resolve();
      }
    })
    .catch((err) => {
      reject(err);
    });
  });
}