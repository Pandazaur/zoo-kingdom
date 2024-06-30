export enum Gender {
    MALE,
    FEMALE,
}

export function formatGender(gender: Gender) {
    switch (gender) {
        case Gender.MALE:
            return `Male ♂`
        case Gender.FEMALE:
            return `Female ♀`
        default:
            return `Other`
    }
}
