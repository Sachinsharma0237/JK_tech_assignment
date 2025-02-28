import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

const mockUserRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockUsers = [
        { id: 1, email: 'user1@example.com' },
        { id: 2, email: 'user2@example.com' },
      ];
      userRepository.find = jest.fn().mockResolvedValue(mockUsers);

      const result = await usersService.getAllUsers();
      expect(result).toEqual({ status: 200, users: mockUsers });
    });

    it('should return 500 if an error occurs', async () => {
      userRepository.find = jest.fn().mockRejectedValue(new Error('DB error'));
      const result = await usersService.getAllUsers();
      expect(result).toEqual({ status: 500, message: 'Internal server error' });
    });
  });

  describe('getUserById', () => {
    it('should return user if found', async () => {
      const mockUser = { id: 1, email: 'user@example.com' };
      userRepository.findOne = jest.fn().mockResolvedValue(mockUser);

      const result = await usersService.getUserById(1);
      expect(result).toEqual({ status: 200, user: mockUser });
    });

    it('should return 404 if user is not found', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(null);
      const result = await usersService.getUserById(1);
      expect(result).toEqual({ status: 404, message: 'User not found' });
    });
  });

  describe('updateUser', () => {
    it('should update user successfully', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue({ id: 1 });
      userRepository.update = jest.fn().mockResolvedValue({});

      const result = await usersService.updateUser(1, { email: 'new@example.com' });
      expect(result).toEqual({ status: 200, message: 'User updated successfully' });
    });

    it('should return 404 if user not found', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(null);
      const result = await usersService.updateUser(1, { email: 'new@example.com' });
      expect(result).toEqual({ status: 404, message: 'User not found' });
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue({ id: 1 });
      userRepository.delete = jest.fn().mockResolvedValue({});

      const result = await usersService.deleteUser(1);
      expect(result).toEqual({ status: 200, message: 'User deleted successfully' });
    });

    it('should return 404 if user not found', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(null);
      const result = await usersService.deleteUser(1);
      expect(result).toEqual({ status: 404, message: 'User not found' });
    });
  });
});
