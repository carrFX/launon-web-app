import { jwtDecode } from 'jwt-decode';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { IDecodedLoginToken } from './type/authType';

export const middleware = (req: NextRequest) => {
  const url = req.nextUrl.clone();
  const isUserLoggedIn = req.cookies.get('loginToken');
  const res = NextResponse.next();

  if(isUserLoggedIn) {
      const userLogin: IDecodedLoginToken  = jwtDecode(isUserLoggedIn.value);
      const role = userLogin.role;
      if(['/auth/register', '/auth/login'].some(path => url.pathname.startsWith(path))) { 
        return NextResponse.redirect(new URL('/', req.url)) 
      }
      if(role == "customer"){
          if(url.pathname.startsWith('/user/dashboard')){
            return NextResponse.redirect(new URL('/', req.url));
          }
      }
  }
  if (!isUserLoggedIn) {
    if (['/user/profile', '/user/dashboard', '/user/orders'].some(path => url.pathname.startsWith(path))) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }
  return res;
};
