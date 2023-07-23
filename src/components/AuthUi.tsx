import React from 'react'

function AuthUi({children}:{children:React.ReactNode}) {
  return (
    <div className='authpage'>{children} </div>
  )
}

export default AuthUi