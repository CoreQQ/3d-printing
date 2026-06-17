import 'dotenv/config';
import * as bcrypt from 'bcryptjs';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient, ProductCategory } from '../generated/prisma/client';

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? 'file:./dev.db' }),
});

const products: Array<{
  name: string;
  slug: string;
  description: string;
  category: ProductCategory;
  priceCents: number;
  material: string;
  printTimeHours: number;
  imageEmoji: string;
  accentColor: string;
  featured?: boolean;
}> = [
  {
    name: 'Articulated Dragon Figurine',
    slug: 'articulated-dragon-figurine',
    description:
      'A fully posable fantasy dragon with moving joints, printed in one piece with no assembly required. A best-seller for desk display and gifting.',
    category: ProductCategory.FIGURINES,
    priceCents: 4500,
    material: 'PLA+',
    printTimeHours: 9,
    imageEmoji: '🐉',
    accentColor: '#C9B7F2',
    featured: true,
  },
  {
    name: 'Low-Poly Fox Miniature',
    slug: 'low-poly-fox-miniature',
    description:
      'A faceted, low-poly fox sculpture with a modern geometric aesthetic. Looks great in a single accent colour on a shelf or desk.',
    category: ProductCategory.FIGURINES,
    priceCents: 2200,
    material: 'PLA',
    printTimeHours: 4,
    imageEmoji: '🦊',
    accentColor: '#F4B8A4',
  },
  {
    name: 'Geometric Hex Planter',
    slug: 'geometric-hex-planter',
    description:
      'A honeycomb-inspired planter with a built-in drip tray, sized for small succulents and herbs. Water-resistant printed finish.',
    category: ProductCategory.HOME_DECOR,
    priceCents: 1800,
    material: 'PETG',
    printTimeHours: 5,
    imageEmoji: '🪴',
    accentColor: '#9CCFD8',
  },
  {
    name: 'Lithophane Photo Lamp',
    slug: 'lithophane-photo-lamp',
    description:
      'Upload any photo and we turn it into a glowing lithophane lamp panel mounted in a minimalist wooden-look base. A unique personalised gift.',
    category: ProductCategory.HOME_DECOR,
    priceCents: 3800,
    material: 'Translucent PLA',
    printTimeHours: 7,
    imageEmoji: '🖼️',
    accentColor: '#F6D8A8',
    featured: true,
  },
  {
    name: 'Mini Vase Trio',
    slug: 'mini-vase-trio',
    description:
      'A set of three vase-mode printed bud vases with smooth spiral walls. Each one is watertight and finished with a silky matte texture.',
    category: ProductCategory.HOME_DECOR,
    priceCents: 3200,
    material: 'PLA Silk',
    printTimeHours: 6,
    imageEmoji: '🏺',
    accentColor: '#B8D8BA',
  },
  {
    name: 'Adjustable Phone Stand',
    slug: 'adjustable-phone-stand',
    description:
      'A sturdy, cable-friendly phone stand with three viewing angles. Fits all common phone sizes, including with a case on.',
    category: ProductCategory.FUNCTIONAL,
    priceCents: 1400,
    material: 'PETG',
    printTimeHours: 2,
    imageEmoji: '📱',
    accentColor: '#9CCFD8',
  },
  {
    name: 'Wall-Mounted Cable Organiser',
    slug: 'wall-mounted-cable-organiser',
    description:
      'Keep chargers and cables tidy with this self-adhesive wall mount organiser. Sold individually, designed to be mixed and matched.',
    category: ProductCategory.FUNCTIONAL,
    priceCents: 1200,
    material: 'PETG',
    printTimeHours: 1.5,
    imageEmoji: '🔌',
    accentColor: '#F4B8A4',
  },
  {
    name: 'Modular Desk Organiser Set',
    slug: 'modular-desk-organiser-set',
    description:
      'A four-piece modular desk tray system that clips together in any layout you like, for pens, cables, and small office supplies.',
    category: ProductCategory.FUNCTIONAL,
    priceCents: 2900,
    material: 'PLA+',
    printTimeHours: 6,
    imageEmoji: '🗂️',
    accentColor: '#C9B7F2',
  },
  {
    name: 'Modern Geometric Chess Set',
    slug: 'modern-geometric-chess-set',
    description:
      'A complete 32-piece chess set in a sleek faceted style, printed in two contrasting colours. Board sold separately on request.',
    category: ProductCategory.TABLETOP_GAMING,
    priceCents: 6500,
    material: 'PLA+',
    printTimeHours: 14,
    imageEmoji: '♟️',
    accentColor: '#F6D8A8',
    featured: true,
  },
  {
    name: 'Dungeon Heroes Miniature Pack',
    slug: 'dungeon-heroes-miniature-pack',
    description:
      'A set of five 32mm tabletop RPG miniatures — warrior, mage, rogue, cleric, and ranger — ready to prime and paint for your next campaign.',
    category: ProductCategory.TABLETOP_GAMING,
    priceCents: 2800,
    material: 'Resin',
    printTimeHours: 8,
    imageEmoji: '🗡️',
    accentColor: '#B8D8BA',
  },
  {
    name: 'Articulated Fidget Robot',
    slug: 'articulated-fidget-robot',
    description:
      'A pocket-sized robot toy with rotating arms and a swivelling head, printed fully assembled. A fun, fidget-friendly desk companion.',
    category: ProductCategory.TECH_ACCESSORIES,
    priceCents: 2500,
    material: 'PLA',
    printTimeHours: 4,
    imageEmoji: '🤖',
    accentColor: '#9CCFD8',
  },
  {
    name: 'Mechanical Keyboard Wrist Rest',
    slug: 'mechanical-keyboard-wrist-rest',
    description:
      'An ergonomic, honeycomb-cored wrist rest sized for full and tenkeyless keyboards, with a soft-touch printed surface.',
    category: ProductCategory.TECH_ACCESSORIES,
    priceCents: 2100,
    material: 'TPU + PLA',
    printTimeHours: 5,
    imageEmoji: '⌨️',
    accentColor: '#F4B8A4',
  },
];

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? 'owner@dublin3dprints.ie';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'ChangeMe123!';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: { email: adminEmail, passwordHash },
  });
  console.log(`Admin user ready: ${adminEmail}`);

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }
  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
