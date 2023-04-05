export const environment = {
  production: false,
  apiUrlUserData: 'https://localhost:7055/Users',
  apiUrlSignup:
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBsJY4UpFQN5ym9TsvoepJaCT_KTrYoG4M',
  apiUrlSignIn:
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBsJY4UpFQN5ym9TsvoepJaCT_KTrYoG4M',
  apiUrlRecipe:
    'https://ng-recipe-book-17639-default-rtdb.firebaseio.com/recipes.json',
  firebaseConfig: {
    apiKey: 'AIzaSyBsJY4UpFQN5ym9TsvoepJaCT_KTrYoG4M',
    authDomain: 'ng-recipe-book-17639.firebaseapp.com',
    databaseURL: 'https://ng-recipe-book-17639-default-rtdb.firebaseio.com',
    projectId: 'ng-recipe-book-17639',
    storageBucket: 'ng-recipe-book-17639.appspot.com',
    messagingSenderId: '1083670828749',
    appId: '1:1083670828749:web:9e9b0f5266c7234c2efb84',
  },
};
