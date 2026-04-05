/**
 * Maximum allowed image file size (5MB)
 * Used for client-side validation before upload
 */
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Valid image MIME types for upload
 * Supports common web image formats including modern formats like AVIF
 */
export const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/avif'];
