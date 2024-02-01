export default async function TryCatch<T>(
    fn: () => Promise<{ data: T }>
): Promise<{ data?: T; error?: string }> {
    try {
        return await fn()
    } catch (error) {
        return { error: (error as Error).message }
    }
}
