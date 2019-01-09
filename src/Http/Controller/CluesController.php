<?php namespace Defr\CrosswordFieldType\Http\Controller;

use Anomaly\Streams\Platform\Http\Controller\ResourceController;
use Defr\CrosswordsModule\Clue\Contract\ClueRepositoryInterface;
use Defr\CrosswordsModule\Word\Contract\WordRepositoryInterface;

class CluesController extends ResourceController
{

    /**
     * Searches for the clues.
     *
     * @param  WordRepositoryInterface  $words  The words
     * @param  ClueRepositoryInterface  $clues  The clues
     * @param  string                   $word   The word
     * @return ClueCollection
     */
    public function find(
        WordRepositoryInterface $words,
        ClueRepositoryInterface $clues,
        $word
    ) {
        if (!$word) {
            return response('Word not set!', 500);
        }

        if (is_string($word)) {
            $wordEntry = $words->findByWord($word);
        }

        if (is_numeric($word)) {
            $wordEntry = $words->find($word);
        }

        if (!$wordEntry) {
            return response('Word not found!', 500);
        }

        return response()->json($clues->findAllByWord($wordEntry));
    }

}
