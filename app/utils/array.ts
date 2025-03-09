type PredicateFunction<T> = (value: T) => boolean;

export function filter<T>(elements: T[], ...predicates : PredicateFunction<T>[] ){
    return elements.filter(element => predicates.every(predicate => predicate(element)))
}