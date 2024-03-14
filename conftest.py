import os
import shutil
from llama_index.core import StorageContext

import src.service
from src.config import config
import pytest


def remove_dir(path):
    if os.path.exists(path):
        shutil.rmtree(path)


@pytest.fixture(autouse=True)
def before_each():
    remove_dir('./local_storage_test/')

    # TODO: Implement better global state handling
    src.service.storage_context = StorageContext.from_defaults()


def pytest_sessionstart(session):
    config()
