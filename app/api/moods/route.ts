import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { Mood as PrismaMood } from '@prisma/client';
import { Mood } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tech = searchParams.get('tech');
    const rating = searchParams.get('rating');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build where clause based on filters
    const where = {
      AND: [
        // Tech filter
        tech && tech !== 'all'
          ? {
              tech: {
                contains: tech,
                mode: 'insensitive' as const,
              },
            }
          : {},
        // Rating filter
        rating && rating !== 'all'
          ? {
              rating: {
                gte: parseInt(rating),
                ...(rating === '1' ? { lte: 2 } : {}),
              },
            }
          : {},
        // Search filter
        search
          ? {
              OR: [
                {
                  comment: {
                    contains: search,
                    mode: 'insensitive' as const,
                  },
                },
                {
                  userId: {
                    contains: search.startsWith('@') ? search.slice(1) : search,
                    mode: 'insensitive' as const,
                  },
                },
              ],
            }
          : {},
      ].filter((condition) => Object.keys(condition).length > 0),
    };

    const moods = await prisma.mood.findMany({
      where,
      include: {
        user: {
          select: {
            username: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
      take: limit,
      skip: offset,
    });

    // Get total count for pagination
    const total = await prisma.mood.count({ where });

    // Transform data to match the expected format
    const transformedMoods: Mood[] = (
      moods as (PrismaMood & {
        user: { username: string; firstName: string; lastName: string };
      })[]
    ).map((mood) => ({
      id: mood.id,
      emoji: mood.emoji,
      rating: mood.rating,
      comment: mood.comment,
      tech: mood.tech,
      date: mood.date.toISOString(),
      user: {
        username: mood.user.username,
        firstName: mood.user.firstName,
        lastName: mood.user.lastName,
      },
    }));

    return NextResponse.json({
      data: transformedMoods,
      total,
      hasMore: offset + limit < total,
    });
  } catch (error) {
    console.error('Error fetching moods:', error);
    return NextResponse.json(
      { error: 'Failed to fetch moods' },
      { status: 500 }
    );
  }
}
