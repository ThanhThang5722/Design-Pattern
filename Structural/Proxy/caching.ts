interface UserRepository {
    findById(id: string): string;
}

class DatabaseUserRepository implements UserRepository {
    constructor() {}
    findById(id: string): string {
        console.log(`[DB] Querying database for user ${id}...`);
        return `User(${id})`;
    }
}

class CachedUserRepository implements UserRepository {
    private cache: Map<string, string> = new Map();

    constructor(private realRepo: UserRepository) {}

    findById(id: string): string {
        if(this.cache.has(id)) {
            console.log(`[Cache] Returning cached user ${id}`);
            return this.cache.get(id)!;
        }
        const result = this.realRepo.findById(id);
        this.cache.set(id, result);
        return result;
    }
}

const repo: UserRepository = new CachedUserRepository(new DatabaseUserRepository());

console.log(repo)
console.log(repo.findById("u1")); // [DB] query
console.log(repo.findById("u1")); // [Cache] hit
console.log(repo.findById("u2")); // [DB] query
console.log(repo.findById("u1")); // [Cache] hit