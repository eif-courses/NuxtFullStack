export default defineOAuthGoogleEventHandler({
    async onSuccess(event, { user, tokens }) {

        await setUserSession(event, {
            user: {
                id: user.sub,
                login: user.name,
                email: user.email,
                picture: user.picture,
                loggedInAt: new Date().toISOString(),
            },
        });
        return sendRedirect(event, '/');
    },
    onError(event, error) {
        console.error('OAuth Error:', error); // Log any errors
        return sendRedirect(event, '/login');
    },
});