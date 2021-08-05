import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';
import passport from 'passport';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      const { cookie, findUser } = await this.authService.login(userData);
      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public callback = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('google', {
      successRedirect: '/users',
      failureRedirect: '/users',
    });
    // passport.authenticate('google', {
    //   successMessage: 'Success',
    // });
    res.send('<h1>Welcome Back</h1>');
  };

  public loginWithGoogle = (req: Request, res: Response, next: NextFunction) => {
    try {
      this.authService.signInWithGoogle();
    } catch (error) {
      next(error);
    }
  };

  public dummy = (req: RequestWithUser, res: Response, next: NextFunction) => {
    // res.send('hello');
    res.send('<a href = "/auth/google">Authenticate with google</a>');
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
