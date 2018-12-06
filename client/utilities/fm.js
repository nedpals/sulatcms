import fm from '@egoist/front-matter/dist/front-matter'
import { parse } from 'yaml';

const fmTest = (str, delimiter = '---') => typeof fm(str, delimiter).head !== 'undefined' && typeof fm(str, delimiter).head !== 'undefined' ? true : false
const frontmatter = (str, delimiter = '---') => {
    const { head, body } = fm(str, delimiter)

    return {
        attributes: parse(head),
        body
    }
}

export default frontmatter
export {
    fmTest
}