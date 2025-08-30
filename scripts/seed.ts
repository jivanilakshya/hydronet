import connectDB from '../lib/db';
import { User } from '../lib/models';
import { hashPassword } from '../lib/auth';

async function seed() {
  try {
    await connectDB();
    console.log('Connected to MongoDB');

    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@hydronet.com' });
    
    if (!adminExists) {
      const adminUser = new User({
        name: 'Admin User',
        email: 'admin@hydronet.com',
        passwordHash: await hashPassword('admin123'),
        createdAt: new Date(),
      });

      await adminUser.save();
      console.log('Admin user created: admin@hydronet.com / admin123');
    } else {
      console.log('Admin user already exists');
    }

    // Create test user
    const testExists = await User.findOne({ email: 'test@hydronet.com' });
    
    if (!testExists) {
      const testUser = new User({
        name: 'Test User',
        email: 'test@hydronet.com',
        passwordHash: await hashPassword('test123'),
        createdAt: new Date(),
      });

      await testUser.save();
      console.log('Test user created: test@hydronet.com / test123');
    } else {
      console.log('Test user already exists');
    }

    console.log('Seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
