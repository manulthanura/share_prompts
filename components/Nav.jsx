"use client";

import Link from 'next/link' ;
import Image from 'next/image' ;
import { useState, useEffect } from 'react';
import {signIn, signOut, useSession, getproviders} from 'next-auth/react'

const Nav = () => {
  const isUserLoggedIn = true;
  const [providers, setproviders] = useState(null);
  const [toggleDropdown, settoggleDropdown] = useState(false);

  useEffect(() => {
    const setproviders = async () => {
      const response = await getproviders();
      setproviders(response);
    }
    setproviders();
  }, [])

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">GitHub Promt</p>
      </Link>
      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className='black_btn'>
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">Sign Out</button>
            <Link href="/profile">
              <Image 
                // Add google image here
                src="/assets/images/logo.svg" 
                width={37}
                height={37}
                className="rounded-full"
                alt="Profile" 
              />
            </Link>
          </div>
        ) : (
          <>
          {Provider && Object.values(providers).map((provider) => (
            <button
              type="button"
              key={provider.name}
              className="black_btn"
              onClick={() => signIn(provider.id)}
            >
              Sign in
            </button>
          ))
          }
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            <Image 
            // Add google image here
            src="/assets/images/logo.svg" 
            width={37}
            height={37}
            className="rounded-full"
            alt="Profile" 
            onClick={() => settoggleDropdown ((prev) => !prev)}
            />
          </div>
        ):(
        <>
          {providers && Object.values(providers).map((provider) => (
            <button
              type="button"
              key={provider.name}
              className="black_btn"
              onClick={() => signIn(provider.id)}
            >
              Sign in
            </button>
          ))}
        </>
        )}
      </div>
    </nav>
  )
}

export default Nav