interface Props {
    id: string,
    title: string,
    author: string,
    edition: number,
}

export class Book {
    private id: string;
    private title: string;
    private author: string;
    private edition: number;

    private constructor(props: Props) {
        this.id = props.id;
        this.title = props.title;
        this.author = props.author;
        this.edition = props.edition;
    }

    get getId() {
        return this.id;
    }

    static fromObject(object: Props) {
        return new Book(object);
    }

    update({ title, author, edition }: Partial<Props>) {
        this.title = title ?? this.title;
        this.author = author ?? this.author;
        this.edition = edition ?? this.edition;
    }
}
