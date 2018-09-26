class Matrix {

    constructor(rows, columns) {
        this.rows = rows;
        this.columns = columns;
        this.data = [];
        for (let i = 0; i < this.rows; i++) {
            this.data[i] = [];
            for (let j = 0; j < this.columns; j++)
                this.data[i][j] = 0;
        }
    }

    /** Converts array to matrix */
    static fromArray(array) {
        let m = new Matrix(array.length, 1);
        for (let i = 0; i < array.length; i++) m.data[i][0] = array[i];
        return m;
    }

    /** Converts matrix to array */
    toArray() {
        let result = [];
        for (let i = 0; i < this.rows; i++)
            for (let j = 0; j < this.columns; j++)
                result.push(this.data[i][j]);
        return result;
    }

    /** Fills matrix with random numbers */
    randomize() {
        for (let i = 0; i < this.rows; i++)
            for (let j = 0; j < this.columns; j++)
                this.data[i][j] = Math.random() * 2 - 1;
        return this;
    }

    /** Transposes matrix (ex 3x2 -> 2x3) */
    static transpose(matrix) {
        let result = new Matrix(matrix.columns, matrix.rows);
        for (let i = 0; i < matrix.rows; i++)
            for (let j = 0; j < matrix.columns; j++)
                result.data[j][i] = matrix.data[i][j];
        return result;
    }

    /** Subtracts matrix of matrix */
    static subtract(a, b) {
        if (a.rows !== b.rows || a.cols !== b.cols) return console.log("Error at subtract! (Matrix.multiply,columns_not_match)");
        let result = new Matrix(a.rows, a.columns);
        for (let i = 0; i < result.rows; i++)
            for (let j = 0; j < result.columns; j++)
                result.data[i][j] = a.data[i][j] - b.data[i][j];
        return result;
    }

    /** Multiplies matrix of matrix */
    static multiply(m1, m2) {
        if (m1.columns !== m2.rows)
            return console.warn("Error at multiply! (Matrix.multiply,columns_not_match)");
        let result = new Matrix(m1.rows, m2.columns);
        for (let i = 0; i < result.rows; i++)
            for (let j = 0; j < result.columns; j++) {
                let sum = 0;
                for (let k = 0; k < m1.columns; k++)
                    sum += m1.data[i][k] * m2.data[k][j];
                result.data[i][j] = sum;
            }
        return result;
    }

    /** Multiplies matrix of matrix */
    multiply(n) {
        for (let i = 0; i < this.rows; i++)
            for (let j = 0; j < this.columns; j++) {
                if (n instanceof Matrix) this.data[i][j] *= n.data[i][j];
                else this.data[i][j] *= n;
            }
        return this;
    }

    /** Returns copy of Matrix */
    copy() {
        let m = new Matrix(this.rows, this.columns);
        for (let i = 0; i < this.rows; i++)
            for (let j = 0; j < this.columns; j++)
                m.data[i][j] = this.data[i][j];
        return m;
    }

    /** Apply function to every element of matrix */
    map(fn) {
        for (let i = 0; i < this.rows; i++)
            for (let j = 0; j < this.columns; j++) {
                let val = this.data[i][j];
                this.data[i][j] = fn(val);
            }
        return this;
    }

    /** Apply function to every element of matrix */
    static map(matrix, fn) {
        let result = new Matrix(matrix.rows, matrix.columns);
        for (let i = 0; i < matrix.rows; i++)
            for (let j = 0; j < matrix.columns; j++) {
                let val = matrix.data[i][j];
                result.data[i][j] = fn(val);
            }
        return result;
    }

    /** Adds matrix to matrix */
    add(n) {
        for (let i = 0; i < this.rows; i++)
            for (let j = 0; j < this.columns; j++)
                if (n instanceof Matrix)
                    this.data[i][j] += n.data[i][j];
                else
                    this.data[i][j] += n;
        return this;
    }

    /** Print's matrix */
    print() {
        console.table(this.data);
        return this;
    }

    /** Save's matrix */
    serialize() { return JSON.stringify(this); }

    /** Load's matrix */
    static deserialize(data) {
        if (typeof data == 'string') data = JSON.parse(data);
        let matrix = new Matrix(data.rows, data.cols);
        matrix.data = data.data;
        return matrix;
    }


}

if (typeof module !== 'undefined') {
    module.exports = Matrix;
}