import React from 'react';

export default React.createContext<{
    hasUser: boolean;
    setHasUser(hasUser: boolean): void;
}>({
    hasUser: false,
    setHasUser() {}
});
