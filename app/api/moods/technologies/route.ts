import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const technologies = await prisma.mood.findMany({
      select: {
        tech: true,
      },
      distinct: ['tech'],
      where: {
        tech: {
          not: null,
        },
      },
      orderBy: {
        tech: 'asc',
      },
    });

    const techList = technologies
      .map((mood) => mood.tech)
      .filter((tech): tech is string => tech !== null)
      .sort();

    return NextResponse.json(techList);
  } catch (error) {
    console.error('Error fetching technologies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch technologies' },
      { status: 500 }
    );
  }
}
