import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            register: jest.fn(),
            changeUserPassword: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return an access token on successful login', async () => {
      const mockResponse = {
        status: 200,
        accessToken: 'mocked-token',
        message: 'Logged In!',
      };
      jest.spyOn(authService, 'login').mockResolvedValue(mockResponse);

      const result = await authController.login({
        email: 'test@example.com',
        password: 'password',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should return 404 if credentials are invalid', async () => {
      const mockResponse = {
        status: 404,
        message: 'Invalid email or password',
      };
      jest.spyOn(authService, 'login').mockResolvedValue(mockResponse);

      const result = await authController.login({
        email: 'wrong@example.com',
        password: 'wrongpass',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('register', () => {
    it('should return 201 when user is registered successfully', async () => {
      const mockResponse = {
        status: 201,
        message: 'User registered successfully',
      };
      jest.spyOn(authService, 'register').mockResolvedValue(mockResponse);

      const result = await authController.register({
        email: 'new@example.com',
        password: 'password',
        role: 'user',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should return 400 when user already exists', async () => {
      const mockResponse = { status: 400, message: 'User already exists' };
      jest.spyOn(authService, 'register').mockResolvedValue(mockResponse);

      const result = await authController.register({
        email: 'existing@example.com',
        password: 'password',
        role: 'user',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('change-password', () => {
    it('should return 200 when password is changed successfully', async () => {
      const mockResponse = {
        status: 200,
        message: 'Password changed successfully',
      };
      jest
        .spyOn(authService, 'changeUserPassword')
        .mockResolvedValue(mockResponse);

      const result = await authController.changePassword({
        email: 'test@example.com',
        oldPassword: 'oldpass',
        newPassword: 'newpass',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should return 400 when old password is incorrect', async () => {
      const mockResponse = { status: 400, message: 'Incorrect old password' };
      jest
        .spyOn(authService, 'changeUserPassword')
        .mockResolvedValue(mockResponse);

      const result = await authController.changePassword({
        email: 'test@example.com',
        oldPassword: 'wrongpass',
        newPassword: 'newpass',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should return 404 when user is not found', async () => {
      const mockResponse = { status: 404, message: 'User not found' };
      jest
        .spyOn(authService, 'changeUserPassword')
        .mockResolvedValue(mockResponse);

      const result = await authController.changePassword({
        email: 'nonexistent@example.com',
        oldPassword: 'oldpass',
        newPassword: 'newpass',
      });
      expect(result).toEqual(mockResponse);
    });
  });
});
