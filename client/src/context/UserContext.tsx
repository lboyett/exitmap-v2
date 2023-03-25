import React, { useState } from "react"

interface UserProviderType {
	children: any;
}

const UserContext = React.createContext([{}, () => {}])

let initialState = {}

const UserProvider = (props: UserProviderType) => {
  const [state, setState] = useState(initialState)

  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }