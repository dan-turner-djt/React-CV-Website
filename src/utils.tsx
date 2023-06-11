import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, setDoc, deleteDoc, doc } from 'firebase/firestore';
import { SkillsDocInfo } from './Pages/EditablePages/Skills/Skills';
import { WorkHistoryDocInfo } from './Pages/EditablePages/WorkHistory/WorkHistory';
import { EducationDocInfo } from './Pages/EditablePages/Education/Education';
import { ProjectsDocInfo } from './Pages/EditablePages/Projects/Projects';
import { JapaneseDocInfo } from './Pages/EditablePages/Japanese/Japanese';
import { DemoPageDocInfo } from './Pages/EditablePages/DemoPage/DemoPage';

export type DocInfo = SkillsDocInfo | WorkHistoryDocInfo | EducationDocInfo | ProjectsDocInfo | JapaneseDocInfo | DemoPageDocInfo;

export type FormattedDoc = {
  doc: DocInfo,
  edited: boolean,
  deleted: boolean
}

export const checkLoggedIn = (): boolean => {
  const auth = getAuth();
  if (auth.currentUser) {
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

export const updateOrdering = (list: FormattedDoc[]): FormattedDoc[] => {
  let orderedList: FormattedDoc[] = [...list];
  orderedList.sort((a,b) => Number(a.doc.order) - Number(b.doc.order));
  orderedList.forEach((item, i) => {
    if (!item.deleted && item.doc.order !== i) {
      orderedList[i].doc.order = i;
    }
  });

  return orderedList;
}

export const getFirebaseDocs = (resourceName: string): Promise<FormattedDoc[]> => {
  const db = getFirestore();
  const colRef = collection(db, resourceName);

  return new Promise<FormattedDoc[]>((resolve, reject) => {
    getDocs(colRef)
    .then((snapshot) => {
      let foundDocs: DocInfo[] = [];
      snapshot.docs.forEach((document) => {
        foundDocs.push({ ...(document.data() as DocInfo), id: document.id });
      })
      let formattedDocs: FormattedDoc[] = foundDocs.map((docInfo: DocInfo) => {
        return {doc: docInfo, edited: false, deleted: false};
      })
      formattedDocs = updateOrdering(formattedDocs);
      resolve(formattedDocs);
    })
    .catch(err => {
      reject(err);
    });
  });
}

export const setFirebaseDocs = (resourceName: string, infoToSet: DocInfo[], counter: number = 0): Promise<void> => {
  const db = getFirestore();

  return new Promise<void>((resolve, reject) => {
    if (infoToSet.length === 0) {
      resolve();
      return;
    }
    const data: DocInfo = infoToSet[counter];
    const id: string = data.id;
    setDoc(doc(db, resourceName, id), data)
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

export const deleteFirebaseDocs = (resourceName: string, infoToSet: DocInfo[], counter: number = 0): Promise<void> => {
  const db = getFirestore();

  return new Promise<void>((resolve, reject) => {
    if (infoToSet.length === 0) {
      resolve();
      return;
    }
    const id: string = infoToSet[counter].id;
    deleteDoc(doc(db, resourceName, id))
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