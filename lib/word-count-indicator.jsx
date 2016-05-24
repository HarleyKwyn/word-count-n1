import {React} from 'nylas-exports';

export default class WordCountIndicator extends React.Component {

  // Note: You should assign a new displayName to avoid naming
  // conflicts when injecting your item
  static displayName = 'WordCountIndicator';

  // When you register as a composer button, you receive a
  // reference to the draft, and you can look it up to perform
  // actions and retrieve data.
  static propTypes = {
    draft: React.PropTypes.object.isRequired,
    session: React.PropTypes.object.isRequired,
  };

  // TODO: Figure out how to do a debounce with should component update
  // shouldComponentUpdate(nextProps) {
  //   // Our render method doesn't use the provided `draft`, and the draft changes
  //   // constantly (on every keystroke!) `shouldComponentUpdate` helps keep N1 fast.
  //   console.log(nextProps);
  //   // return nextProps.session !== this.props.session;
  //   return true;
  // }

  render() {
    var text = this._getDraftStringOnly(this.props.draft.body);
    const wordCount = text.split(/\s+/).length;
    return  (
      <div className="btn btn-toolbar">{wordCount}w</div>
    );
  }

  _getDraftStringOnly(draftBody) {
    // This is hacky, wish there was a way to get just the draft portion
    // Create a DOM for manipulation
    var DOM = this._parseHTMLtoDOM(draftBody);
    // Get the quoted elements and signatures
    // Also cast DOM node array to JavaScript Array with this stupid interview trivia question
    var gmailQuotes =  Array.prototype.slice.apply(DOM.getElementsByClassName('gmail_quote'));
    var signature = Array.prototype.slice.apply(DOM.getElementsByTagName('signature'));
    // Remove those silly nodes. They don't count.
    signature.map(function(node){node.remove()});
    gmailQuotes.map(function(node){node.remove()});
    return DOM.documentElement.textContent;
  }

  _parseHTMLtoDOM(str) {
    var tmp = document.implementation.createHTMLDocument();
    tmp.body.innerHTML = str;
    return tmp;
  };

}
