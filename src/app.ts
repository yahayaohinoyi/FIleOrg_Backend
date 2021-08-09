process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from 'config';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { createConnection } from 'typeorm';
import { dbConnection } from '@databases';
import { Routes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import passport from 'passport';
import session from 'express-session';
import UserService from './services/users.service';
// import { Strategy } from 'passport-google-oauth2';

class App {
  public app: express.Application;
  public port: string | number;
  public env: string;
  public userService = new UserService();

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || 'development';

    this.env !== 'test' && this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
    this.connectPassport();
    this.makeOAuthRequests();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    createConnection(dbConnection);
  }

  private initializeMiddlewares() {
    this.app.use(morgan(config.get('log.format'), { stream }));
    this.app.use(cors({ origin: config.get('cors.origin'), credentials: config.get('cors.credentials') }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    // this.app.use(
    //   session({
    //     secret: 'keyboard cat',
    //     resave: true,
    //     saveUninitialized: true,
    //   }),
    // );
    this.app.use(passport.initialize());
    this.app.use(passport.session());

    passport.serializeUser((user, done) => {
      return done(null, user);
    });

    passport.deserializeUser((user, done) => {
      return done(null, user);
    });
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Example docs',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  public connectPassport() {
    const GoogleStrategy = require('passport-google-oauth2').Strategy;
    const userService = this.userService;

    passport.use(
      new GoogleStrategy(
        {
          clientID: '785688806738-4p0kv2uc77lb6vf5qg28p34mh390eb7r.apps.googleusercontent.com',
          clientSecret: 'x_ipzW4TtGuY__HC99uKado5',
          callbackURL: 'http://localhost:3000/auth/google/callback',
          passReqToCallback: true,
        },
        function (request, accessToken, refreshToken, profile, cb) {
          userService.createUserFromGoogle(profile);
          return cb(null, profile);
        },
      ),
    );
  }

  private makeOAuthRequests() {
    this.app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

    this.app.get(
      '/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/users',
        failureRedirect: '/users',
      }),
    );

    // this.app.get(
    //   'https://developers.google.com/oauthplayground/',
    //   passport.authenticate('google', {
    //     successRedirect: '/',
    //     failureRedirect: '/',
    //   }),
    // );
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
