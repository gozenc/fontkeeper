import Dropdown from "../Dropdown"
import Icon from "../Icon"
import "./style.scss"

export default function Pagination(props) {

    const itemCount = props.data.length
    const [activeRows, setActiveRows] = React.useState(props.activeRows ? props.activeRows : props.rows[0])
    const activePage = props.activePage ? props.activePage : 1
    const [pageCount, setPageCount] = React.useState(Math.ceil(itemCount / activeRows))

    React.useEffect(() => {
        setPageCount(Math.ceil(itemCount / activeRows))
    }, [activeRows])

    return (
        <div className="pagination">
            <div className="pagination__info">
                Found {itemCount} items.
            </div>
            <div className="pagination__rows">
                Rows <Dropdown 
                        onSelect={e => {
                            props.onRowSelect ? props.onRowSelect(e) : undefined
                            setActiveRows(parseInt(e.target.value, 10))
                        }} 
                        selected={activeRows} 
                        options={props.rows}
                    />
            </div>
            <div className="pagination__pages">
                Page <Dropdown
                        onSelect={e => props.onPageSelect ? props.onPageSelect(e) : undefined} 
                        selected={activePage} 
                        options={[1,2,3,4]}
                /> of {pageCount}
            </div>
            <div className="pagination__nav">
                <Icon disabled={activePage === 1 ? true : false}  size="mini" type="button" name="first_page"/>
                <Icon disabled={activePage === 1 ? true : false} size="mini" type="button" name="chevron_left"/>
                <Icon disabled={activePage === 1 ? pageCount === 1 ? true : false : true} size="mini" type="button" name="chevron_right"/>
                <Icon disabled={activePage === 1 ? pageCount === 1 ? true : false : true} size="mini" type="button" name="last_page"/>
            </div>
        </div>
    )
}