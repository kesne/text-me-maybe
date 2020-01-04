export let handle = {
    promise: Promise.resolve(),
    ack() {}
};

export async function requireAck(reason: string) {
    if (process.env.NODE_ENV === 'production') {
        return;
    }

    // Wait for existing lock:
    await handle.promise;

    console.log(
        `\n\nABOUT TO SPEND MONEY IN DEVELOPMENT ENVIRONMENT!!\n\n${reason}\n\nClick this link to acknowledge: http://localhost:1337/api/ack\n\n`
    );

    handle.promise = new Promise((resolve, reject) => {
        let timeoutId = setTimeout(() => {
            reject();
        }, 10000);

        handle.ack = () => {
            clearTimeout(timeoutId);
            resolve();
        };
    });

    return handle.promise;
}
