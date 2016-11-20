export interface Tokenizer {
    (text: string): string[];
}
export interface Map<T> {
    [key: string]: T;
}
export interface SerializedClassifier {
    options: ClassifierOptions;
}
export interface ClassifierOptions {
    docCount?: Map<number>;
    wordCount?: Map<number>;
    wordFrequencyCount?: Map<Map<number>>;
    categories?: Map<boolean>;
    totalDocuments?: number;
    vocabularySize?: number;
    options?: ClassifierOptions;
    tokenizer?: Tokenizer;
    vocabulary?: Map<boolean>;
}
export declare class Bayes implements ClassifierOptions {
    docCount: Map<number>;
    wordCount: Map<number>;
    wordFrequencyCount: Map<Map<number>>;
    categories: Map<boolean>;
    totalDocuments: number;
    vocabularySize: number;
    options: ClassifierOptions;
    tokenizer: Tokenizer;
    vocabulary: Map<boolean>;
    /** Naive-Bayes Classifier that uses Laplace Smoothing. */
    constructor(options?: ClassifierOptions);
    /**
     * Initialize each of our data structure entries for this new category
     *
     * @param  {String} categoryName
     */
    initializeCategory(categoryName: string): this;
    /**
     * train our naive-bayes classifier by telling it what `category`
     * the `text` corresponds to.
     */
    learn(text: string, category: string): this;
    /** Determine what category `text` belongs to. */
    categorize(text: string): string | undefined;
    /**
     * Calculate probability that a `token` belongs to a `category`
     *
     * @param  {String} token
     * @param  {String} category
     * @return {Number} probability
     */
    tokenProbability(token: string, category: string): number;
    /**
     * Build a frequency hashmap where
     * - the keys are the entries in `tokens`
     * - the values are the frequency of each entry in `tokens`
     */
    frequencyTable(tokens: string[]): any;
    /** Dump the classifier"s state as a JSON string. */
    toJson(): string;
    /** Initializes a Bayes instance from a JSON state representation.
     * Use this with classifier.toJson(). */
    static fromJson(jsonStr: string): Bayes;
    /** tokenize input string into an array of word tokens.
     * This is the default tokenization function used if user does not provide
     * one in `options`. */
    static defaultTokenizer(text: string): string[];
}
