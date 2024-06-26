export function getAuthForm() {
  return `
	<form class="mui-form" id="auth-form">
        <div class="mui-textfield mui-textfield--float-label">
            <input type="email" id="email" required />
            <label for="email">Email</label>
        </div>
		<div class="mui-textfield mui-textfield--float-label">
            <input type="password" id="password" required />
            <label for="password">Пароль</label>
        </div>
        <button type="submit" class="mui-btn mui-btn--raised mui-btn--primary">
            Войти
        </button>
    </form>
	`;
}

export async function authWithEmailAndPassword(email, password) {
	const apiKey = "AIzaSyDW1u7yqt86jh2G7Ju8W5-JDXRcvzvJgl0";
	const res = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    {
      method: "POST",
      body: JSON.stringify({ email, password, returnSecureToken: true}),
	  headers: {
		"Content-Type": "application/json"
	  }
    })
	const data = await res.json()
	return data.idToken;
}


// https://firebase.google.com/docs/reference/rest/auth?hl=ru#section-sign-in-email-password 